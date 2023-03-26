const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
     
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products

});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
  // be sure to include its associated Products

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json(err);
  }
  
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const rowsUpdated = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!rowsUpdated[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Fetch the updated category after the update is successful
    const updatedCategory = await Category.findByPk(req.params.id);

    res.status(200).json(updatedCategory); // Send the updated category back
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const rowsDeleted = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!rowsDeleted) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully!' });
  }
  catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
