class TagField{
  textField = document.createElement('input');
  tagButton = document.createElement('button');
  container = document.createElement('div');

  tags = []

  isRequired = false;

  options = {
    removeIcon: 'x',
    allowDuplicate: false,
    showButton: true,
    buttonText: 'Adicionar'
  };

  constructor(targetField, options = {}){
    if(typeof targetField == 'string'){
      targetField = document.querySelector(targetField);
    }

    this.targetField = targetField;

    this.options = {
      ...this.options,
      ...options
    };

    this.isRequired = this.targetField.required;

    this.mount();
  }

  mount(){
    this.hideField();
    this.render();
    this.renderTags();
    this.bindEvents();
  }

  renderTags(){
    if(this.targetField.value !== ""){
      this.targetField.value.split(',').forEach((tag)=>{
        this.renderTag(tag);
      });
      
      this.refreshTags();
    }
  }

  hideField(){
    this.targetField.style.display = 'none';
  }

  renderField(){
    this.textField.setAttribute('type', 'text');
    this.textField.required = this.isRequired;

    this.container.appendChild(this.textField);
  }

  renderAnchor(){
    this.tagAnchor = document.createElement('a');
    this.tagAnchor.classList.add('tagfield__anchor');

    this.container.appendChild(this.tagAnchor);
  }

  renderButton(){

    this.tagButton.classList.add('tagfield__button');
    this.tagButton.setAttribute('type','button');
    this.tagButton.innerHTML = this.options.buttonText;

    this.container.appendChild(this.tagButton);
  }

  render(){
    this.container.classList.add('tagfield__container');

    this.renderAnchor();
    this.renderField();

    if(this.options.showButton){
      this.renderButton();
    }

    this.targetField.parentNode.insertBefore(this.container, this.targetField);
  }

  renderTag(content){
    var tag = document.createElement('span');
    tag.classList.add('tagfield__tag');
    tag.setAttribute('tag-content', content);
    tag.innerHTML = content;

    var tagRemove = document.createElement('a');
    tagRemove.classList.add('tagfield__tag-remove')
    tagRemove.innerHTML = this.options.removeIcon;
    tag.appendChild(tagRemove);
    tagRemove.addEventListener('click', (event)=>{
      this.removeTag(event, tag)
    });

    this.container.insertBefore(tag, this.tagAnchor);
  }

  refreshTags(){
    this.tags = [];
    [].forEach.call(this.container.querySelectorAll('[tag-content]'), (tag)=>{
      this.tags.push(tag.attributes['tag-content'].value);
    });

    this.targetField.value = this.tags.join(',');

    if(this.isRequired){
      this.textField.required = this.tags.length == 0;
    }
  }

  removeTag(event, tag){
    tag.remove();
    this.refreshTags();
  }

  onAddTag(event){

    var value = this.textField.value;

    if(value != '' && this.allowAdd(value)){
      this.renderTag(value);
      this.refreshTags();
    }

    this.textField.value = '';
  }

  allowAdd(value){
    if(this.options.allowDuplicate){
      return true;
    }

    if(this.tags.indexOf(value) == -1){
      return true;
    }

    return false;
  }

  bindEvents(){
    this.textField.addEventListener('keypress', (event)=>{
      if (event.which == '13') {
        event.preventDefault();
        this.onAddTag(event);
      }
    });

    if(this.tagButton){
      this.tagButton.addEventListener('click', (event)=>{
        event.preventDefault();

        this.onAddTag(event);
      });
    }
  }
}
