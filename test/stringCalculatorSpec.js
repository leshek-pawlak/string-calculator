var stringCalculator = {
    add: function(stringNumbers) {
        var regexp = /^\/\/(.)\n/
        var regexp2 = /^\/\/(\[(.*)\])+\n/
        var match = stringNumbers.match(regexp) || []
        var match2 = stringNumbers.match(regexp2) || []
        var delimiter = match[1] || match2[2] || ','
        var array = stringNumbers.replace(/\n/g, delimiter).split(delimiter)
        var results = 0
        for (var i = 0; i < array.length; ++i) {
            var val = parseInt(array[i], 10) || 0
            if (val < 0) {
                throw new Error('negatives not allowed');
            } else if (val < 1001) {
                results += val
            }
        }

        return results;
    }
}



describe('string calculator', function() {
    it('add two numbers', function() {
        expect(stringCalculator.add('1,2')).toBe(3);
    })
    it('add empty string', function() {
        expect(stringCalculator.add('')).toBe(0);
    })
    it('add one number with comma', function() {
        expect(stringCalculator.add('4,')).toBe(4);
    })
    it('add comma and number', function() {
        expect(stringCalculator.add(',3')).toBe(3);
    })
    it('add 3 numbers', function() {
        expect(stringCalculator.add('4,3,6')).toBe(13);
    })
    it('add 3 numbers spaced by new line char', function() {
        expect(stringCalculator.add('4\n3\n6')).toBe(13);
    })
    it('add 4 numbers spaced by setted delimiter', function() {
        expect(stringCalculator.add('//;\n1;3;6;1')).toBe(11);
    })
    it('add 4 numbers, but one is negative. throw an exception: “negatives not allowed”', function() {
        var exception = function() {
            stringCalculator.add('1,-3,6,1')
        }; 
        expect(exception).toThrowError('negatives not allowed');
    })
    it('add 3 numbers, but one of they is bigger than 1000. ignore it.', function() {
        expect(stringCalculator.add('1,1000,6,10001')).toBe(1007);
    })
    it('add 3 numbers, but delimiters can be long as fuck.', function() {
        expect(stringCalculator.add('//[;dsafsdfs]\n1;dsafsdfs6;dsafsdfs1')).toBe(8);
    })
    it('add 3 numbers, but has two or more delimiters.', function() {
        // expect(stringCalculator.add('//[&][#][!]\n1!6#87&1')).toBe(94);
    })
    it('add 3 numbers, but has two or more delimiters long as fuck.', function() {
        // expect(stringCalculator.add('//[&dfasdf][#fdrewq][!fasdfas]\n1&dfasdf6!fasdfas88#fdrewq1')).toBe(95);
    })
});