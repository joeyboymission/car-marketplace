import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Schema for the carListing table (version 1)
export const CarListing = pgTable('carListing', {
    id: serial('id').primaryKey(),
    listingTitle: varchar('listingTitle').notNull(),
    tagline: varchar('tagline'),
    originalPrice: varchar('originalPrice'),
    sellingPrice: varchar('sellingPrice').notNull(),
    category: varchar('category').notNull(),
    condition: varchar('condition').notNull(),
    make: varchar('make').notNull(),
    model: varchar('model').notNull(),
    year: varchar('year').notNull(),
    driveType: varchar('driveType').notNull(),
    transmission: varchar('transmission').notNull(),
    fuelType: varchar('fuelType').notNull(),
    mileage: varchar('mileage').notNull(),
    engineSize: varchar('engineSize'),
    cylinder: varchar('cylinder'),
    color: varchar('color').notNull(),
    door: varchar('door').notNull(),
    offerType: varchar('offerType'),
    vin: varchar('vin'),
    listingDescription: varchar('listingDescription').notNull(),
    
    features: json('features').notNull(),
    images: json('images').notNull()
})

export const carImages = pgTable('carImages', {
    id: serial('id').primaryKey(),
    imageUrl: varchar('imageUrl').notNull(),
    carListingId: integer('carListingId').notNull().references(() => CarListing.id)
})

/**
 * NOTE
 * - If you wish to create a new column in the table, you can do so by adding a new key-value pair in the object.
 * - By creating a new column, you will need to update the schema version in the database.
 * - This is done by using the npm command 'npm run db:push', if you are experiencing issues try to comment it first then run the command.
 * - After running the command, uncomment the new column and run the command again.
 * - This will update the schema version in the database.
 * - The downside of this is that you will lose all the data in the table.
 * - Make sure to backup the data before running the command.
 * - On the other hand, if you want to revert the changes, you can use the npm command 'npm run db:pull'.
 */