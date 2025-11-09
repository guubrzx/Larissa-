document.addEventListener('DOMContentLoaded', () => {
    const preContentContainer = document.getElementById('pre-content-container');
    const poemaView = document.getElementById('poema-view');
    const openBtn = document.getElementById('open-btn');
    const poemaContainer = poemaView.querySelector('.poema-scroll-container');
    const poemaTitle = poemaView.querySelector('.poema-title');
    let isPoemaOpen = false;

    // Função para a transição de abrir a carta
    const openLetter = () => {
        if (isPoemaOpen) return;
        isPoemaOpen = true;

        // 1. Esconde o Conteúdo Inicial com animação 3D
        preContentContainer.style.opacity = '0';
        preContentContainer.style.transform = 'translateY(-50px) rotateX(10deg) scale(0.9)';

        // 2. Após a transição (0.8s), troca a view
        setTimeout(() => {
            preContentContainer.style.display = 'none';
            
            // 3. Mostra o Poema (Inicia a animação da 'poema-view')
            poemaView.style.display = 'block';
            
            // 4. Anima a aparição do Poema (delay para aplicar a transição)
            setTimeout(() => {
                poemaView.style.opacity = '1';
                poemaView.style.transform = 'translateY(0)';
                
                // 5. Inicia o observador para o efeito de "Revelar ao Deslizar"
                setupScrollReveal();

            }, 50);

        }, 800); 
    };

    // Função para o efeito de "Revelar ao Deslizar" (mantida por ser a melhor técnica)
    const setupScrollReveal = () => {
        const lines = poemaContainer.querySelectorAll('.poema-content p');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Aparece quando 40% do parágrafo está visível
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // Remove a classe quando sai para criar o efeito de "desvanecer" ao sair
                    entry.target.classList.remove('visible'); 
                }
            });
        }, {
            root: poemaContainer, 
            threshold: 0.4 
        });

        lines.forEach(line => {
            observer.observe(line);
        });
        
        // Garante que o início seja carregado
        setTimeout(() => {
            poemaContainer.scrollTop = 1;
            poemaContainer.scrollTop = 0;
        }, 200);
    };

    // Event Listeners
    openBtn.addEventListener('click', openLetter);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !isPoemaOpen) {
            openLetter();
        }
    });
});
