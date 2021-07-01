import { deepMerge } from "./deepMerge"

describe('deepMerge', () => {
    it('should merge two shallow objects', () => {
        const merged = deepMerge({hello: 'world'}, {foo: 'bar'});
        expect(merged).toEqual({
            hello: 'world',
            foo: 'bar'
        })
    })
    it('should merge two deep objects', () => {
        const merged = deepMerge({props: {hello: 'world'}}, {props: {foo: 'bar'}});
        expect(merged).toEqual({
            props: {
                hello: 'world',
                foo: 'bar'
            }
        })
    })
    it('should overwrite properties from previous object', () => {
        const merged = deepMerge({props: {hello: 'world'}}, {props: {hello: 'bar'}});
        expect(merged).toEqual({
            props: {
                hello: 'bar'
            }
        })
    })
    it('should overwrite objects from previous object', () => {
        const merged = deepMerge({props: {hello: 'world'}}, {props: 'hello'});
        expect(merged).toEqual({
            props: 'hello'
        })
    })
    it('should merge arrays', () => {
        const merged = deepMerge({props: {hello: ['world']}}, {props: {hello: ['bar']}});
        expect(merged).toEqual({
            props: {
                hello: ['world', 'bar']
            }
        })
    })
    it('should handle nulls', () => {
        const merged = deepMerge({props: {hello: ['world']}}, {props: {hello: null}});
        expect(merged).toEqual({
            props: {
                hello: null
            }
        })
    })
})