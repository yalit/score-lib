import {describe, expect, test} from "@jest/globals";
import {objectToFormData} from "../../libraries/form";

describe("Test parseObjectToFormData", () => {
    test('object with only string', () => {
        const obj = {
            one: 'first data',
            other: 'last data'
        }

        const formData = objectToFormData(obj)

        expect(formData).toBeInstanceOf(FormData)
        expect(formData.has('one')).toBeTruthy()
        expect(formData.get('one')).toBe('first data')
        expect(formData.has('other')).toBeTruthy()
        expect(formData.get('other')).toBe('last data')
    })

    test('object with string and number', () => {
        const obj = {
            one: 'first data',
            other: 4
        }

        const formData = objectToFormData(obj)

        expect(formData).toBeInstanceOf(FormData)
        expect(formData.has('one')).toBeTruthy()
        expect(formData.get('one')).toBe('first data')
        expect(formData.has('other')).toBeTruthy()
        expect(formData.get('other')).toBe('4')
    })

    test('object with object',() => {
        const obj = {
            one: 'first data',
            other: {
                insideString: 'inside string data',
                insideNumber: 4
            }
        }

        const formData = objectToFormData(obj)

        expect(formData).toBeInstanceOf(FormData)
        expect(formData.has('one')).toBeTruthy()
        expect(formData.get('one')).toBe('first data')
        expect(formData.has('other[insideString]')).toBeTruthy()
        expect(formData.get('other[insideString]')).toBe('inside string data')
        expect(formData.has('other[insideNumber]')).toBeTruthy()
        expect(formData.get('other[insideNumber]')).toBe('4')
    })

    test('object with array of string',() => {
        const obj = {
            one: 'first data',
            other: ['first array string', 'second array string']
        }

        const formData = objectToFormData(obj)

        expect(formData).toBeInstanceOf(FormData)
        expect(formData.has('one')).toBeTruthy()
        expect(formData.get('one')).toBe('first data')
        expect(formData.has('other[0]')).toBeTruthy()
        expect(formData.get('other[0]')).toBe('first array string')
        expect(formData.has('other[1]')).toBeTruthy()
        expect(formData.get('other[1]')).toBe('second array string')
    })

    test('object with array of objects',() => {
        const obj = {
            one: 'first data',
            other: [
                { subOne: 'first sub one', subObject: {name: 'first sub name'}},
                { subOne: 'second sub one', subObject: {name: 'second sub name'}}
            ]
        }

        const formData = objectToFormData(obj)

        expect(formData).toBeInstanceOf(FormData)
        expect(formData.has('one')).toBeTruthy()
        expect(formData.get('one')).toBe('first data')
        expect(formData.has('other[0][subOne]')).toBeTruthy()
        expect(formData.get('other[0][subOne]')).toBe('first sub one')
        expect(formData.has('other[0][subObject][name]')).toBeTruthy()
        expect(formData.get('other[0][subObject][name]')).toBe('first sub name')

        expect(formData.has('other[1][subOne]')).toBeTruthy()
        expect(formData.get('other[1][subOne]')).toBe('second sub one')
        expect(formData.has('other[1][subObject][name]')).toBeTruthy()
        expect(formData.get('other[1][subObject][name]')).toBe('second sub name')
    })
})
