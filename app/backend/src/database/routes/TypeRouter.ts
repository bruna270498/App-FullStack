import { Router } from 'express';
import TypeController from '../controllers/type.controller';

const typeRouter = Router();

typeRouter.get('/', TypeController.findType);

export default typeRouter;