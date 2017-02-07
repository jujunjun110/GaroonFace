(function () {
    function main() {
        var request = window.superagent;
        var nameElements = document.querySelectorAll('.username_grn');
        nameElements.forEach(function (item) {
            var href = item.querySelectorAll('a')[0].getAttribute('href');
            if (!href) {
                return;
            }

            var path = href.split("'")[1];
            var imgPageUrl = document.location.origin + path;

            var localImageUrl = localStorage.getItem(imgPageUrl);
            if (localImageUrl) {
                setImage(item, localImageUrl);
                return;
            }

            console.log('request: ' + imgPageUrl);

            request
                .get(imgPageUrl)
                .end(function (err, res) {
                    var el = document.createElement('html');
                    el.innerHTML = res.text;
                    var imgs = el.getElementsByTagName('img');
                    var imgPath = imgs[1].getAttribute('src');
                    setImage(item, imgPath);
                    localStorage.setItem(imgPageUrl, imgPath);
                });
        })

        function setImage(item, imgPath) {
            var imgEl = document.createElement('img');
            imgEl.setAttribute('src', imgPath);
            imgEl.setAttribute('style', 'display: block; width: 80px');
            item.parentNode.appendChild(imgEl);
        }
    }

    var s = document.createElement('script');
    s.src = '//cdnjs.cloudflare.com/ajax/libs/superagent/3.4.2/superagent.min.js';
    s.onload = main();
    document.body.appendChild(s);
}());

