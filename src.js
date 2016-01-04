$('.readability-info-class').remove();
function textCounts(val) {

    "use strict";
    return {
        charactersNoSpaces: val.replace(/\s+/g, '').length,
        characters: val.length,
        words: val.match(/\S+/g).length,
        lines: val.split(/\r*\n/).length,
        sentences: val.match(/[.]|[!]|[?]\s/gi).length
    };
}
var bodyText = $('body').text();
bodyText = bodyText.split('// Write JavaScript here')[0];
console.log(bodyText);
var counts = textCounts(bodyText);
var wordCount = counts.words;
var sentenceCount = counts.sentences;
var syllableCount = function() {
    "use strict";
    var text = $('body').text();
    text = bodyText;
    var word = text.toLowerCase();                                     
    if(word.length <= 3) { return 1; }                            
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    return word.match(/[aeiouy]{1,2}/g).length;
};
var letterNumberCount = function() {
    "use strict";
    var text = $('body').text();
    text = bodyText.split('// Write JavaScript here')[0];
    return text.match(/[A-Z]|[0-9]/gi).length;
};
var complexCount = function() {
    "use strict";
    var words = $('body').text();
    return words.match(/\S+/g).length;
};

console.log('-----');
console.log("Word Count: " + wordCount);
console.log("Letter/No. Count: " + letterNumberCount());
console.log("Syllable Count: " + syllableCount());
console.log("Sentence Count: " + sentenceCount);

var ari = function() {
    "use strict";
  var characterWeight = 4.71;
  var sentenceWeight = 0.5;
  var base = 21.43;
  return characterWeight * (letterNumberCount() / wordCount) + sentenceWeight * (wordCount / sentenceCount) - 21.43;
};
//console.log('Automated readability index: ' + ari());

// Flesch-Kincaid grade level
var fkgl = (0.39 * wordCount) / sentenceCount + (11.8 * syllableCount()) / wordCount - 15.59;
//console.log('Flesch-Kincaid grade levl: ' + fkgl);

// Coleman-Liau index
var cl = (5.89 * letterNumberCount()) / wordCount - (30.0 * sentenceCount) / wordCount - 15.8;
//console.log('Coleman-Liau index: ' + cl);

var gradeAverage = ( ari() + fkgl + cl ) / 3;
console.log('Reading Grade Level: ' + gradeAverage);

function gradeToAgeRange(grade) {
    "use strict";
  if (grade < 5) {
    return {
      age: "5 to 9",
      level: "K - 4"
    };
  }
  if (grade >= 5 && grade < 6) {
    return {
      age: "9 to 11",
      level: "5"
    };
  }
  if (grade >= 6 && grade < 7) {
    return {
      age: "10 to 12",
      level: "6"
    };
  }
  if (grade >= 7 && grade < 8) {
    return {
      age: "11 to 13",
      level: "7"
    };
  }
  if (grade >= 8 && grade < 9) {
    return {
      age: "12 to 14",
      level: "8"
    };
  }
  if (grade >= 9 && grade < 10) {
    return {
      age: "13 to 15",
      level: "9"
    };
  }
  if (grade >= 10 && grade < 11) {
    return {
      age: "14 to 16",
      level: "10"
    };
  }
  if (grade >= 11 && grade < 12) {
    return {
      age: "15 to 17",
      level: "11"
    };
  }
  if (grade >= 12 && grade < 13) {
    return {
      age: "16 to 18",
      level: "12"
    };
  }
  if (grade >= 13 && grade < 14) {
    return {
      age: "17 to 19",
      level: "Undergrad"
    };
  }
  if (grade >= 14 && grade < 15) {
    return {
      age: "18 to 20",
      level: "Undergrad"
    };
  }
  if (grade >= 15 && grade < 16) {
    return {
      age: "19 to 21",
      level: "Undergrad"
    };
  }
  if (grade >= 16 && grade < 17) {
    return {
      age: "20 to 22",
      level: "Undergrad"
    };
  }
  if (grade >= 17) {
    return {
      age: "21+",
      level: "Graduate"
    };
  }
}
var ageRange = gradeToAgeRange(gradeAverage);
console.log(ageRange);

var $readabilityInfo = $("<div>")
    .attr("id", "readability-info")
  .addClass('readability-info-class')
  .css('position','fixed')
  .css('opacity','0')
  .css('top','-100px')
  .css('right','20px')
  .css('z-index','99999999')
  .css('background','#0769AD')
  .css('color','#fff')
  .css('border','1px solid rgba(255,255,255,0.7')
  .css('border-radius','20px')
  .css('font-family','Helvetica')
  .css('font-weight','100')
  .css('cursor','pointer')
  .css('padding','10px 15px')
  .text('Reading Grade Level: ' + ageRange.level + ' (' + ageRange.age + ' years old)' );
$(document).on("click", ".readability-info-class", function(){ 
  $('#readability-info').remove();
});
$('body').append($readabilityInfo);
$('.readability-info-class').animate({
    opacity: 1,
    top: "20px"
  }, 500, function() {
    // Animation complete.
  });
setTimeout(
  function() {
    $('.readability-info-class').fadeOut();
  }, 3000);
