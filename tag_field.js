'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagField = function () {
  function TagField(targetField) {
    _classCallCheck(this, TagField);

    if (typeof targetField == 'string') {
      targetField = document.querySelector(targetField);
    }

    this.targetField = targetField;

    this.options = {
      removeIcon: 'x',
      allowDuplicate: false,
      showButton: true,
      buttonText: 'Adicionar'
    };

    this.tags = [];

    this.mount();
  }

  _createClass(TagField, [{
    key: 'mount',
    value: function mount() {
      this.hideField();
      this.render();
      this.renderTags();
      this.bindEvents();
    }
  }, {
    key: 'renderTags',
    value: function renderTags() {
      var _this = this;

      this.targetField.value.split(',').forEach(function (tag) {
        _this.renderTag(tag);
      });
    }
  }, {
    key: 'hideField',
    value: function hideField() {
      this.targetField.style.display = 'none';
    }
  }, {
    key: 'renderField',
    value: function renderField() {
      this.textField = document.createElement('input');
      this.textField.setAttribute('type', 'text');
      this.textField.required = this.targetField.required;

      this.container.appendChild(this.textField);
    }
  }, {
    key: 'renderAnchor',
    value: function renderAnchor() {
      this.tagAnchor = document.createElement('a');
      this.tagAnchor.classList.add('tagfield__anchor');

      this.container.appendChild(this.tagAnchor);
    }
  }, {
    key: 'renderButton',
    value: function renderButton() {
      this.tagButton = document.createElement('button');
      this.tagButton.classList.add('tagfield__button');
      this.tagButton.setAttribute('type', 'button');
      this.tagButton.innerHTML = this.options.buttonText;

      this.container.appendChild(this.tagButton);
    }
  }, {
    key: 'render',
    value: function render() {
      this.container = document.createElement('div');
      this.container.classList.add('tagfield__container');

      this.renderAnchor();
      this.renderField();

      if (this.options.showButton) {
        this.renderButton();
      }

      this.targetField.parentNode.insertBefore(this.container, this.targetField);
    }
  }, {
    key: 'renderTag',
    value: function renderTag(content) {
      var _this2 = this;

      var tag = document.createElement('span');
      tag.classList.add('tagfield__tag');
      tag.setAttribute('tag-content', content);
      tag.innerHTML = content;

      var tagRemove = document.createElement('a');
      tagRemove.classList.add('tagfield__tag-remove');
      tagRemove.innerHTML = this.options.removeIcon;
      tag.appendChild(tagRemove);
      tagRemove.addEventListener('click', function (event) {
        _this2.removeTag(event, tag);
      });

      this.container.insertBefore(tag, this.tagAnchor);
    }
  }, {
    key: 'refreshTags',
    value: function refreshTags() {
      var _this3 = this;

      this.tags = [];
      [].forEach.call(this.container.querySelectorAll('[tag-content]'), function (tag) {
        _this3.tags.push(tag.attributes['tag-content'].value);
      });

      this.targetField.value = this.tags.join(',');

      if (this.targetField.required) {
        this.textField.required = this.tags.length == 0;
      }
    }
  }, {
    key: 'removeTag',
    value: function removeTag(event, tag) {
      tag.remove();
      this.refreshTags();
    }
  }, {
    key: 'onAddTag',
    value: function onAddTag(event) {

      var value = this.textField.value;

      if (value != '' && this.allowAdd(value)) {
        this.renderTag(value);
        this.refreshTags();
      }

      this.textField.value = '';
    }
  }, {
    key: 'allowAdd',
    value: function allowAdd(value) {
      if (this.options.allowDuplicate) {
        return true;
      }

      if (this.tags.indexOf(value) == -1) {
        return true;
      }

      return false;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this4 = this;

      this.textField.addEventListener('keypress', function (event) {
        if (event.which == '13') {
          event.preventDefault();
          _this4.onAddTag(event);
        }
      });

      if (this.tagButton) {
        this.tagButton.addEventListener('click', function (event) {
          event.preventDefault();

          _this4.onAddTag(event);
        });
      }
    }
  }]);

  return TagField;
}();
