const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // Access our Tag model and run .findAll() method)
  // Product.findAll() is the JavaScript equivalent of the following SQL query: SELECT * FROM tag;
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name'
        ]
      },
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // We want to find a tag where its id value equals whatever req.params.id is, 
  // much like the following SQL query: SELECT * FROM tag WHERE id = 1;
  Tag.findOne({
    where: {
      id: req.params.id
    },
    // replace the existing `include` with this
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name'
        ]
      },
    ]
  })
    // if the .then() method returns nothing from the query, 
    // we send a 404 status back to the client to indicate everything's 
    // okay and they just asked for the wrong piece of data.
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Tag not found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
});

router.post('/', (req, res) => {
  // create a new tag
  // expects {tag_name: 'Dark Olive'}
  Tag.create({
    tag_name: req.body.tag_name
})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
        where: {
            id: req.params.id
        }
    }
)
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
})
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
