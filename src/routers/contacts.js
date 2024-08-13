

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
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put(
  '/:contactId',
  validateBody(updateContactSchema),
   validateMongoId('contactId'),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  validateMongoId('contactId'),
  ctrlWrapper(patchContactController),
);


export default router;
