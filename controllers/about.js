'use strict';

const about = {
  createView(req, res) {
    res.render('about', { title: 'About' });
  }
};

export default about;