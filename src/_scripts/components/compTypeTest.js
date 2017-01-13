'use restrict'

export default ()=> {
  console.log('load comp typetest');

function getFontProperties () {
    let fontSize = $('#sliderOutputFontSize').val();
    let fontLeading = $('#sliderOutputFontLeading').val();
    let fontTracking = $('#sliderOutputFontTracking').val()/10;
    return {
      fontSize: fontSize,
      fontLeading: fontLeading,
      fontTracking: fontTracking,
    }
}

// console.log(getFontProperties().fontSize, getFontProperties().fontLeading);

  $('#slider--font-size').on('moved.zf.slider', function() {
    $('.type-test__paragraph p').css('font-size', getFontProperties().fontSize + 'px');
  });
  $('#slider--font-leading').on('moved.zf.slider', function() {
    $('.type-test__paragraph p').css('line-height', getFontProperties().fontLeading + 'px');
  });
  $('#slider--font-tracking').on('moved.zf.slider', function() {
    $('.type-test__paragraph p').css('letter-spacing', getFontProperties().fontTracking + 'px');
  });

}
