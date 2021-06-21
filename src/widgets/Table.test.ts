import { Table } from "./Table";
import { viz } from "../Viz"

jest.mock('../Viz');

describe('Table', () => {
    beforeEach(() => {
        (viz.text as jest.Mock).mockClear();
    })
    it('should plot optional label', () => {
        const widget = Table({label: 'Hello World', headers: []}, () => ([]));
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.text).toBeCalledWith('Hello World', 5, 1);
    });
    it('should plot two rows', () => {
        const widget = Table({headers: ['header1', 'header2']}, () => ([['hello1', 'world1'], ['hello2', 'world2']]));
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.text).toBeCalledTimes(6);
        expect(viz.text).toBeCalledWith('hello1', 0, 1, {'align': 'left'});
        expect(viz.text).toBeCalledWith('world2', 5, 2, {'align': 'left'});
    });
    it('should plot wider columns', () => {
        const widget = Table({headers: ['1', '2']}, () => ([['1', '222'], ['3', '444']]));
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.text).toBeCalledTimes(6);
        expect(viz.text).toBeCalledWith('1', 0, 1, {'align': 'left'});
        expect(viz.text).toBeCalledWith('444', 2.5, 2, {'align': 'left'});
    });
});