
import { getAllContacts, getContactById,createContact} from '../services/students.js';
import createHttpError from 'http-errors';
import { deleteContact } from "../services/students.js";
import { updateContact } from "../services/students.js";

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
 const { contactId } = req.params;

 // Відповідь, якщо контакт не знайдено
 if (!contact) {
 res.status(404).json({
	message: 'Contact not found'
});
return;
    }
    const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, `Contact with id ${contactId} not found!`));
    return;
  }

  // Відповідь, якщо контакт знайдено
 res.status(200).json({
    status: res.statusCode,
    message: `Successfully found contact with id: ${contactId}!`,
    data: contact,
  });
};


export const createContactController = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({
            status: 400,
            message: 'Name and email are required fields.',
        });
    };


    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};




export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};