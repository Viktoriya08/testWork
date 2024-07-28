export default function initAnimations() {
  function animation(targets, options) {
    const animateTargets = document.querySelectorAll(`.${targets}`);
    const animateClass = options.animationClass || 'animate';
    const treshold = options.treshold || 0.45;
    const isReturnable = options.isReturnable || false;
    const delayStart = Number.isNaN(options.delayStart) ? 0.25 : options.delayStart;
    const delayShift = Number.isNaN(options.delayShift) ? 0.1 : options.delayShift;

    const observeParams = {
      rootMargin: '0px',
      threshold: treshold,
    };
    if (window.matchMedia('(max-width: 768px)').matches) {
      observeParams.threshold = +treshold - 0.1;
    }

    if (animateTargets) {
      const observerCallback = (entries) => {
        let delay = Number.isNaN(delayStart) ? 0.25 : delayStart;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting && entry.target.classList.contains(targets)
          ) {
            if (delayShift && delayShift !== 0) {
              entry.target.setAttribute(
                'style',
                `animation-delay: ${delay}s;`,
              );
              delay += delayShift;
            }

            entry.target.classList.add(animateClass);

            entry.target.addEventListener(
              'animationend',
              (e) => {
                e.stopImmediatePropagation();
                entry.target.classList.remove(
                  targets,
                  animateClass,
                );
                entry.target.removeAttribute('style');
              },
              { once: true },
            );
          } else if (isReturnable) {
            entry.target.classList.add(targets);
          }
        });
      };
      const animateObserver = new IntersectionObserver(
        observerCallback,
        observeParams,
      );

      animateTargets.forEach((target) => {
        animateObserver.observe(target);
      });
    }
  }

  animation('fadeInUp', {
    animationClass: 'js-visible',
  });

  animation('fadeInLeft', {
    animationClass: 'js-visible',
  });

  animation('fadeInRight', {
    animationClass: 'js-visible',
  });

  animation('fadeInBottom', {
    animationClass: 'js-visible',
  });

  animation('fadeInLeftFaster', {
    animationClass: 'js-visible',
  });
  animation('cardRotate', {
    animationClass: 'js-visible',
  });
  animation('cardBgVisible', {
    animationClass: 'js-visible',
  });
}
