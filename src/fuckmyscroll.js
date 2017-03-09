/**
 * @author  Gabriel Jacinto aka. GabrielJMJ <gamjj74@hotmail.com>
 * @license MIT License
 */

class FuckMyScroll {
  /**
   * Set options
   *
   * @param {Integer} speed [N]pixels/milliseconds
   * @param {Function} init
   * @param {Function} end
   * @param {Object} context
   */
  constructor({speed, init, end}, context = window) {
    this.opts = {};
    this.opts.speed = speed || 7;
    this.opts.init = init || function () {};
    this.opts.end = end || function () {};
    this.context = context;
  }

  init() {
    // Catch all elements using fmscroll attribute
    const elements = document.querySelectorAll('*[fmscroll]');

    let that = this;

    [].forEach.call(elements, el => {
      let target = el.getAttribute('href'),
        init = that.context[el.getAttribute('fms-init')] || function () {},
        end = that.context[el.getAttribute('fms-end')] || function () {};
        
      el.onclick = function (e) {
        e.preventDefault();

        let oX = that.context.scrollX,
          oY = that.context.scrollY;
        // Go to point zero to catch the real distance from page top
        that.context.scroll(0, 0);
          
        let id = target.substr(0, 1) === '#' ? target.substr(1) : target,
          targetEl = document.getElementById(id),
          posInfo = targetEl.getBoundingClientRect(),
          y = posInfo.top,
          x = posInfo.left;

        // Back to original point
        that.context.scroll(oX, oY);

        // Fires the global init event
        that.opts.init(id);

        // Fires the element init event
        init();

        that.scrollTo(x, y).then(() => {
          // Fires the global end event
          that.opts.end(id);

          // Fires the element end event
          end();
        });
      };
    });
  }

  scrollTo(posX, posY) {
    let that = this;

    return new Promise(resolve => {
      let currY = that.context.scrollY,
        currX = that.context.scrollX,
        speed = that.opts.speed;
      
      // Only execute if the Y distance is under 1
      // I DON'T KNOW WHY, BUT WITH OTHER WAY DID NOT WORK
      if (
        (currY > posY && (currY - posY) > 1) ||
        (posY > currY && (posY - currY) > 1) ||
        (posX > currX && (posX - currY) > 1) ||
        (currX > posX && (currX - posX) > 1)
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

        that.context.scroll(distX, distY);

        distY = currY !== that.context.scrollY ? distY : 0;
        distX = currX !== that.context.scrollX ? distX : 0;

        // Check if is the end of the page
        if (!!distY || !!distX) {
          // If is not in the expected point, keep scrolling
          setTimeout(function () {
            that.scrollTo(posX, posY).then(resolve);
          }, 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }
}