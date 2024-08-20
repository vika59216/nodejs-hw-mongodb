

import { Router } from 'express';
import { validateMongoId } from '../middlewares/validateMongoId.js';

import {
  getContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    upsertContactController,
      patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema, } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);


router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  validateMongoId('contactId'),
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
    upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put(
  '/:contactId',
  validateBody(updateContactSchema),
  upload.single('photo'),
   validateMongoId('contactId'),
  ctrlWrapper(upsertContactController),
);





router.patch(
  '/:contactId',

  upload.single('photo'),
  validateBody(updateContactSchema),
  validateMongoId('contactId'),
  ctrlWrapper(patchContactController),
);

export default router;
