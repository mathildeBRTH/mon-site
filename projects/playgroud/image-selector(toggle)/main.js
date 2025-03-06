"use strict";

const photoList = document.getElementById('photo-list');
const total = document.getElementById('total').querySelector('span')

photoList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
        li.classList.toggle('selected');

        const selectedCount = photoList.querySelectorAll('li.selected').length;
        total.textContent = selectedCount;
    });
});