document.addEventListener("DOMContentLoaded", () => {
    const amogusElements = document.querySelectorAll(".amogus");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const orbitRadius = 0.48 * innerHeight;
    const escapeRadius = 0.2 * innerHeight;
    let angle = 0;
    let speed = 0.005;

    function updatePositions() {
        angle += speed;
        amogusElements.forEach((el, index) => {
            const offsetAngle = (Math.PI * 2 * index) / amogusElements.length;
            const x = centerX + orbitRadius * Math.cos(angle + offsetAngle) - el.clientWidth / 2;
            const y = centerY + orbitRadius * Math.sin(angle + offsetAngle) - el.clientHeight / 2;
            el.dataset.orbitX = x;
            el.dataset.orbitY = y;
            if (!el.dataset.escaping) {
                el.style.position = "absolute";
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
            }
        });
        requestAnimationFrame(updatePositions);
    }
    
    function handleMouseMove(event) {
        amogusElements.forEach(el => {
            const orbitX = parseFloat(el.dataset.orbitX);
            const orbitY = parseFloat(el.dataset.orbitY);
            const dx = event.clientX - orbitX;
            const dy = event.clientY - orbitY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < escapeRadius) {
                const angleAway = Math.atan2(dy, dx) + Math.PI;
                const escapeX = orbitX + Math.cos(angleAway) * escapeRadius;
                const escapeY = orbitY + Math.sin(angleAway) * escapeRadius;
                el.style.left = `${escapeX}px`;
                el.style.top = `${escapeY}px`;
                el.dataset.escaping = "true";
            } else {
                el.dataset.escaping = "";
            }
        });
    }

    document.addEventListener("mousemove", handleMouseMove);
    updatePositions();
});
