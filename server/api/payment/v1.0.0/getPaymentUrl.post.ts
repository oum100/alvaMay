import { PrismaClient} from "@prisma/client";
import Debug from 'debug'
import {validateGetPaymentUrl} from '~/alvato/models/payment'

const debug = Debug('api:payment:GetPaymentUrl')
const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

})