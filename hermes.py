import chromadb
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, LlamaForCausalLM

KOSMO_CHROMA_FOLDER = "PATH"

assert KOSMO_CHROMA_FOLDER != "kosmo_chroma2", "specify correct path"

chroma_client = chromadb.PersistentClient(path=KOSMO_CHROMA_FOLDER)

collection = chroma_client.get_or_create_collection(name="my_collection",
                                                    metadata={"hnsw:space": "cosine"},
                                                    embedding_function=chromadb.utils.
                                                    embedding_functions.SentenceTransformerEmbeddingFunction(
                                                            model_name="sentence-transformers/distiluse-base-multilingual-cased-v2"
                                                        )
                                                    )



tokenizer = AutoTokenizer.from_pretrained('NousResearch/Hermes-3-Llama-3.2-3B', trust_remote_code=True, device_map="auto")
model = LlamaForCausalLM.from_pretrained(
    "NousResearch/Hermes-3-Llama-3.2-3B",
    torch_dtype=torch.float16,
    device_map="auto"
    )

def get_augmentation_data(query: str, topk: int = 5, offset: int = 0) -> str:
    results = collection.query(
        query_texts=query, # Chroma will embed this for you
        n_results = topk + offset # how many results to return
    )

    return " ".join(results["documents"][0][offset:])

def make_prompt(query: str) -> str:
    data = get_augmentation_data(query, 5, 4)
    sys_prompt = "<|im_start|>system \
    Ты разумный, развитый искусственный интеллект для ответа на любые вопросы пользователя касательно космонавтики. \
    Отвечай только на русском языке. Пользуйся информацией данной вместе с каждым вопросом<|im_end|>"

    return sys_prompt + "\n<|im_start|>user\n" + f"Используя информацию {data} ответь на вопрос {query}" + "<|im_end|>"

def talk_with_hermes(query: str) -> str:
    input_ids = tokenizer(make_prompt(query), return_tensors="pt").input_ids.to("cuda" if torch.cuda.is_available() else "cpu")
    generated_ids = model.generate(
        input_ids, max_new_tokens=500,
        temperature=0.7, repetition_penalty=1.1,
        do_sample=True, eos_token_id=tokenizer.eos_token_id, pad_token_id=tokenizer.pad_token_id)
    response = tokenizer.decode(generated_ids[0][input_ids.shape[-1]:], skip_special_tokens=True, clean_up_tokenization_space=True)
    return response
