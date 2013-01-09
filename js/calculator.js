/**
 * String calculator
 */
var calculator = (function () {

  function add(numberString) {
    var delimiters = [",","\n"],
        numbers,
        hasDelimiter;

    hasDelimiter = numberString.indexOf("//") === 0;

    if (hasDelimiter) {
      delimiters = parseDelimiters(numberString);
      numberString = removeDelimiterDefinition(numberString);
    }

    numbers = parseNumbers(numberString, delimiters);

    return calculateSum(numbers);
  }

  function parseDelimiters(numberString) {
    var indexOfFirstNewLine = numberString.indexOf("\n");
    var delimiterDefinition = numberString.substring(2, indexOfFirstNewLine);
    var delimiters = _.reject(delimiterDefinition.split(/[\[\]]/), function (d) {
      return d === "";
    });
    return delimiters;
  }

  function parseNumbers(numberString, delimiters) {
    var numbers = numberString.split(new RegExp("[" + delimiters.join("|") + "]"));
    return numbers;
  }

  function removeDelimiterDefinition(numberString) {
    return numberString.substring(numberString.indexOf("\n") + 1);
  }

  function calculateSum(numbers) {
    var sum = 0;
    _.each(numbers, function (number) {
      var n = parseInt(number);

      if (isNaN(n) || n > 1000) {
        n = 0;
      }

      if (n < 0) {
        throw "negative numbers not allowed";
      }

      sum += n;
    });
    return sum;
  }

  return {add: add};

}());
