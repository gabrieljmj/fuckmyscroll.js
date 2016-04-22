/**
 * @author  Gabriel Jacinto aka. GabrielJMJ <gamjj74@hotmail.com>
 * @license MIT License
 */

class FuckMyScroll {
  /**
   * Set options
   *
   * @param {Object} opts {speed: [N]pixels/millisecond}
   */
  constructor(opts) {
    this.opts = opts || {
      speed: 7,
      init: () => {},
      end: () => {}
    };
  }

  init() {
    // Catch all elements using fmscroll attribute
    const elements = document.querySelectorAll('*[fmscroll]');
    let that = this;

    [].forEach.call(elements, el => {
      let target = el.getAttribute('href');
        
      el.onclick = function (e) {
        e.preventDefault();

        // Fires the init event
        that.opts.init();

        let oX = window.scrollX,
          oY = window.scrollY;
        // Go to point zero to catch the real distance from page top
        window.scroll(0, 0);
          
        let id = target.substr(0, 1) === '#' ? target.substr(1) : target,
          y = document.getElementById(id).getBoundingClientRect().top,
          x = document.getElementById(id).getBoundingClientRect().left;
        
        // Back to original point
        window.scroll(oX, oY);
        that.scrollTo(x, y);

        // Fires the end event
        that.opts.end();
      };
    });
  }

  scrollTo(posX, posY) {
    let currY = window.scrollY,
      currX = window.scrollX,
      speed = this.opts.speed,
      that = this;

    // Only execute if the Y distance is under 1
    // I DON'T KNOW WHY, BUT WITH OTHER WAY DID NOT WORK
    if (
        (currY > posY && (currY - posY) > 1)
        || (posY > currY && (posY - currY) > 1)
    ) {
      let distY,
        distX;

      // Check if current position is under or above the target one
      // For both X and Y
      if (currY > posY) {
        // If the distance is under the speed, so scroll it
        distY = (currY - posY) > speed ? currY - speed : currY - (currY - posY);
      } else if (currY === posY) {
        // If the current position is the same that the target, do not move
        distY = currY;
      } else {
        distY = (posY - currY) > speed ? currY + speed : currY +  (posY - currY);
      }

      // Same logic of Y
      if (currX > posX) {
        distX = (currX - posX) > speed ? currX - speed : currX - (currX - posX);
      } else if (currX === posX) {
        distX = currX;
      } else {
        distX = (posX - currX) > speed ? currX + speed : currX + (posX - currX);
      }

      window.scroll(distX, distY);

      // If is not in the expected point, keep scrolling
      setTimeout(function () {
          that.scrollTo(posX, posY);
      }, 1);
    }
  }
}

export {FuckMyScroll};