$(function () {

    load();
    bindEvents();

    function bindEvents() {
        $('#generateBtn').click(function () {
            var info = {
                id: $('#ID').val().trim(),
                app: $('#APP').val().toLowerCase().trim(),
                key: $('#KEY').val(),
                type: $('#TYPE').val(),
                length: $('#LENGTH').val()
            };

            remember(info);

            var passwd = generatepasswd(info);
            $('#passwd').val(passwd).css("font-weight", "Bold").focus();

            $('#qrcode').empty().qrcode({
                text: passwd,
                width: 120,
                height: 120
            });
        });

        $("#KEY").keydown(function (event) {
            if (event.keyCode == 32 || event.keyCode == 13 || event.keyCode == 188 || event.keyCode == 186) {
                $("#generateBtn").click();
            }
        });

        $('.help-trigger').on('click', function () {
            $('#help').show()[0].scrollIntoView();
        });

        var $copyBtn = $('#copyBtn');
        var clipboard = new Clipboard($copyBtn[0]);
        clipboard.on('success', function(){
            window.alert("复制成功！可以粘贴密码了！");
        });
    }

    function load() {
        var lastUsed = localStorage.lastUsed || {};
        if (typeof(lastUsed) === 'string') {
            try {
                lastUsed = JSON.parse(lastUsed) || {};
            } catch (e) {
            }
        }

        if (lastUsed.id) {
            $('#ID').val(lastUsed.id);
        }

        if (lastUsed.app) {
            $('#APP').val(lastUsed.app);
        }

        if (lastUsed.length) {
            $('#LENGTH').val(lastUsed.length);
        }

        if (lastUsed.type) {
            $('#TYPE').val(lastUsed.type);
        }
    }

    function remember(info) {
        localStorage.lastUsed = JSON.stringify($.extend({}, info || {}, {key: "???"}));
    }

    function generatepasswd(info) {
        var hash = (new jsSHA(JSON.stringify(info), 'TEXT')).getHash('SHA-512', 'BYTES');
        var passwd = '';
        for (var i = 0; i < info.length; i++) {
            var c = hash.charCodeAt(i % hash.length);
            passwd += info.type.charAt(c % info.type.length);
        }

        return passwd;
    }
});

