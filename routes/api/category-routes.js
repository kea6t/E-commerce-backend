const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // Access our Category model and run .findAll() method)
  // Category.findAll() is the JavaScript equivalent of the following SQL query: SELECT * FROM category;
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'stock'
        ]
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // We want to find a category where its id value equals whatever req.params.id is, 
  // much like the following SQL query: SELECT * FROM category WHERE id = 1;
  Category.findOne({
    where: {
      id: req.params.id
    },
    // replace the existing `include` with this
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'stock'
        ]
      }
    ]
  })
    // if the .then() method returns nothing from the query, 
    // we send a 404 status back to the client to indicate everything's 
    // okay and they just asked for the wrong piece of data.
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Category not found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  // expects {category_name: 'shirts'}
  Category.create({
    category_name: req.body.category_name
})
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    {
        where: {
            id: req.params.id
        }
    }
)
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
        where: {
            id: req.params.id
        }
    }
)
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
