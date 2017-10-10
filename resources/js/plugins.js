// Initialize the RedactorPlugins object if it doesn't exist
if ( !RedactorPlugins ) { var RedactorPlugins = {}; }

// font-color
RedactorPlugins.fontcolor = function()
{
    return {
        init: function()
        {
            var colors = ['#E0E5E5','#B8BFC2','#4A4A4A','#0a0a0a','#fefefe','#031E41','#d60b30'];


            var $button = this.button.add('fontcolor', 'Text Color');
            this.button.setIcon($button, '<i class="re-icon-fontcolor"></i>');

            var $dropdown = this.button.addDropdown($button);
            $dropdown.attr('rel', 'fontcolor');
            $dropdown.width(242);

            var $selector = $('<div style="overflow: hidden; text-align: center;">');
            var $selectorText = $('<span rel="text" class="re-dropdown-box-selector-font" style="background: #eee; float: left; padding: 8px 0; cursor: pointer; font-size: 12px; width: 100%;">Text</span>');
            //var $selectorBack = $('<span rel="back" class="re-dropdown-box-selector-font" style="float: left; padding: 8px 0; cursor: pointer; font-size: 12px; width: 50%;">Highlight</span>');

            $selector.append($selectorText);
            //$selector.append($selectorBack);

            $dropdown.append($selector);

            this.fontcolor.buildPicker($dropdown, 'textcolor', colors);
            //this.fontcolor.buildPicker($dropdown, 'backcolor', colors);

            $selectorText.on('mousedown', function(e)
            {
                e.preventDefault();

                $dropdown.find('.re-dropdown-box-selector-font').css('background', 'none');
                //$dropdown.find('.re-dropdown-box-backcolor').hide();
                $dropdown.find('.re-dropdown-box-textcolor').show();

                $(this).css('background', '#eee');
            });

            //$selectorBack.on('mousedown', function(e)
            //{
            //    e.preventDefault();
            //
            //    $dropdown.find('.re-dropdown-box-selector-font').css('background', 'none');
            //    $dropdown.find('.re-dropdown-box-textcolor').hide();
            //    $dropdown.find('.re-dropdown-box-backcolor').show();
            //
            //    $(this).css('background', '#eee');
            //});

        },
        buildPicker: function($dropdown, name, colors)
        {
            var $box = $('<div class="re-dropdown-box-' + name + '">');
            var rule = (name == 'backcolor') ? 'background-color' : 'color';
            var len = colors.length;
            var self = this;
            var func = function(e)
            {
                e.preventDefault();
                self.fontcolor.set($(this).data('rule'), $(this).attr('rel'));
            };

            for (var z = 0; z < len; z++)
            {
                var color = colors[z];

                var $swatch = $('<a rel="' + color + '" data-rule="' + rule +'" href="#" style="float: left; box-sizing: border-box; font-size: 0; border: 2px solid #fff; padding: 0; margin: 0; width: 22px; height: 22px;"></a>');
                $swatch.css('background-color', color);
                $swatch.on('mousedown', func);

                $box.append($swatch);
            }

            var $elNone = $('<a href="#" style="display: block; clear: both; padding: 8px 5px; box-sizing: border-box; font-size: 12px; line-height: 1;"></a>').html(this.lang.get('none'));
            $elNone.on('mousedown', $.proxy(function(e)
            {
                e.preventDefault();
                this.fontcolor.remove(rule);

            }, this));

            $box.append($elNone);
            $dropdown.append($box);

            if (name == 'backcolor')
            {
                $box.hide();
            }
        },
        set: function(rule, type)
        {
            this.inline.format('span', 'style', rule + ': ' + type + ';');
            this.dropdown.hide();
        },
        remove: function(rule)
        {
            this.inline.removeStyleRule(rule);
            this.dropdown.hide();
        }
    };

};

// alignment
RedactorPlugins.alignment = function()
{
    return {
        langs: {
            en: {
                "align": "Align",
                "align-left": "Align Left",
                "align-center": "Align Center",
                "align-right": "Align Right",
                "align-justify": "Align Justify",
            }
        },
        init: function()
        {
            var that = this;
            var dropdown = {};

            dropdown.left = { title: that.lang.get('align-left'), func: that.alignment.setLeft };
            dropdown.center = { title: that.lang.get('align-center'), func: that.alignment.setCenter };
            dropdown.right = { title: that.lang.get('align-right'), func: that.alignment.setRight };
            dropdown.justify = { title: that.lang.get('align-justify'), func: that.alignment.setJustify };

            var button = this.button.add('alignment', this.lang.get('align'));
            this.button.setIcon(button, '<i class="re-icon-alignment"></i>');
            this.button.addDropdown(button, dropdown);
        },
        removeAlign: function()
        {
            this.block.removeClass('text-center');
            this.block.removeClass('text-right');
            this.block.removeClass('text-justify');
        },
        setLeft: function()
        {
            this.buffer.set();
            this.alignment.removeAlign();
        },
        setCenter: function()
        {
            this.buffer.set();
            this.alignment.removeAlign();
            this.block.addClass('text-center');
            this.core.editor().focus()
        },
        setRight: function()
        {
            this.buffer.set();
            this.alignment.removeAlign();
            this.block.addClass('text-right');
            this.core.editor().focus()
        },
        setJustify: function()
        {
            this.buffer.set();
            this.alignment.removeAlign();
            this.block.addClass('text-justify');
            this.core.editor().focus()
        }
    };

};

//clips
RedactorPlugins.clips = function()
{
    return {
        init: function()
        {
            var items = [
                ['Athlete Table', '<div class="experience-table"><img src="/images/olympicrings.png"/><h2 class="main-title">Title</h2><div class="row grid-x grid-padding-x"><div class="cell medium-6"><table class="unstriped"><tbody><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div><div class="cell medium-6"><table class="unstriped"><tbody><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></div></div>']
            ];

            this.clips.template = $('<ul id="redactor-modal-list">');

            for (var i = 0; i < items.length; i++)
            {
                var li = $('<li>');
                var a = $('<a href="#" class="redactor-clips-link">').html(items[i][0]);
                var div = $('<div class="redactor-clips">').hide().html(items[i][1]);

                li.append(a);
                li.append(div);
                this.clips.template.append(li);
            }

            this.modal.addTemplate('clips', '<div class="modal-section">' + this.utils.getOuterHtml(this.clips.template) + '</div>');

            var button = this.button.add('clips', 'Clips');
            this.button.setIcon(button, '<i class="re-icon-clips"></i>');
            this.button.addCallback(button, this.clips.show);

        },
        show: function()
        {
            this.modal.load('clips', 'Insert Clips', 500);

            $('#redactor-modal-list').find('.redactor-clips-link').each($.proxy(this.clips.load, this));

            this.modal.show();
        },
        load: function(i,s)
        {
            $(s).on('click', $.proxy(function(e)
            {
                e.preventDefault();
                this.clips.insert($(s).next().html());

            }, this));
        },
        insert: function(html)
        {
            this.buffer.set();
            this.air.collapsedEnd();
            this.insert.html(html);
            this.modal.close();
        }
    };


};
