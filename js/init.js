import '/common/emoji-picker/js/index.js'
$(".textarea-emoji-picker emoji-picker").dataSource = './common/emoji-picker/js/data.json';
$(document).ready(function() {
    $(document).on('emoji-click', '.textarea-emoji-picker emoji-picker', function(e){
        let formInput = $(this).parents('.textarea-emoji-picker').find("textarea");
        let submitButton = $(this).data('button');
        insertTextAtCursor(formInput, e.detail.unicode);
        if(typeof submitButton !== 'undefined') {
            $('.btnSavePost').removeAttr('disabled');
        }
    });
    
    $(document).on('click', '.emoji-picker-button', function(e) {
        var _this = $(this).parents('.textarea-emoji-picker').find(".emoji-picker");
        $(".emoji-picker").not(_this).hide();
        _this.toggle();
    });
    
    $(document).on('click', 'emoji-picker, .emoji-picker, .emoji-picker-button', function(e) {
        e.stopPropagation();
    });
    
    $(document).click(function(){
        $(".emoji-picker").hide();
    });

    function loadDataWish(){
        let url = $('#wish-form').attr('url-get-wish');
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.reverse().forEach(function(item) {
                let name = item[0] || '';
                let wish = item[1] || '';
                if (name && wish) {
                    html = html + "<div class='wish-box-item'><strong>" + name + "</strong><p>" + wish + "</p></div>";
                }
            });
            $('#wrapper').find('.wish-box').html(html);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    loadDataWish();

    function loadDataAlbum() {
        let htmlAlbum = '';
        for (let number = 1; number <= 40; number++) {
            let urlImg = 'https://tuyenit.s3.us-east-2.amazonaws.com/img/album/MIN_' + number.toString().padStart(4, '0') + '.jpg';
            htmlAlbum = htmlAlbum
                + `<div class="grid grid-item btn-see-more-gallery" data-index="0"
                    style="position: absolute; left: 0%; top: 0px;">
                    <img src="` + urlImg + `" alt="" class="img img-responsive">
                </div>`;
            photoGalleries.push({
                src: urlImg,
                thumb: urlImg,
                subHtml: ``
            });
        }
        $('#gallery').find('.gallery-container').html(htmlAlbum);
    }
    loadDataAlbum();
});
