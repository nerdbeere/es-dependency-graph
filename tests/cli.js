var cli    = require('../lib/cli'),
    path   = require('path'),
    fs     = require('fs'),
    rimraf = require('rimraf'),
    expect = require('chai').expect;

describe('CLI', function () {
    afterEach(function (done) {
        rimraf(path.resolve(__dirname, 'tmp'), done);
    });
    it('should generate a graph.json', function () {
        var graphPath = path.resolve(__dirname, 'tmp/graph.json'),
            contents;

        cli({
            walk: false,
            path: [path.resolve(__dirname, 'assets/')],
            output: graphPath
        });

        expect(fs.existsSync(path.resolve(__dirname, 'tmp/graph.json')))
            .to.equal(true);

        expect(JSON.parse(fs.readFileSync(graphPath, 'utf8')))
            .to.deep.equal({
                module1: {
                    requires: ['bar']
                },
                module2: {
                    requires: ['module1']
                }
            });
    });
});