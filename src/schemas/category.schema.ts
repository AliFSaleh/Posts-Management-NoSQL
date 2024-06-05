import {object, string, z} from 'zod';

const params = {
    params: object({
        categoryId: string(),
    }),
};

export const createCategorySchema = object({
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
    })
})

export const getCategorySchema = {
    ...params
}

export const updateCategorySchema = object({
    ... params,
    body: object({
        title: string(),
    }).partial()
})

export const deleteCategorySchema = object({
    ...params,
});