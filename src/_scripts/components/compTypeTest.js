'use restrict'

export default ()=> {
  console.log('load comp typetest');
  let fontSize = $('#sliderOutput1').val();

  $('[data-slider]').on('moved.zf.slider', function() {
    // console.log('Those slides sure did change!');
    let fontSize = $('#sliderOutput1').val();
    console.log(fontSize);
    $('.type-test__paragraph p').css('font-size', fontSize + 'px');
  });
}
