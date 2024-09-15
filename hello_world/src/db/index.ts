import { MongoClient } from 'mongodb'
export const DbClient = new MongoClient('mongodb://classic:password@db:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5&authSource=admin', );
