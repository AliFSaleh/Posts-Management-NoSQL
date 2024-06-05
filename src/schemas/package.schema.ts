import {object, string, z} from 'zod';

const params = {
    params: object({
      packageId: string(),
    }),
};

export const createPackageSchema = object({
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        price: z.number({
            required_error: 'Price is required'
        }),
        postsNumber: z.number({
            required_error: 'Posts number is required'
        })
        .min(1, 'Posts number should be bigger than 1')
    })
})

export const getPackageSchema = {
    ...params
}

export const updatePackageSchema = object({
    ... params,
    body: object({
        title: string(),
        price: z.number(),
        postsNumber: z.number().min(1, 'Posts number should be bigger than 1')
    }).partial()
})

export const deletePackageSchema = object({
    ...params,
});