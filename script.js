var list = document.getElementById("list");
var inp = document.getElementById("task");

// Local
var localList = JSON.parse(localStorage.getItem("listItems")) || [];
if (localList) {
    for (var i = 0; i < localList.length; i++) {
        var li = document.createElement("LI");
        var button = document.createElement("button");
        button.appendChild(document.createTextNode("Sil"));
        button.setAttribute("onClick", "sil(this)");
        button.setAttribute("class", "btn btn-primary listBtn");
        li.appendChild(document.createTextNode(localList[i].value));
        if (localList[i].isChecked) {
            li.setAttribute("class", "checked");
        }
        li.appendChild(button);
        li.addEventListener("click", (e) => {
            e.target.classList.toggle("checked");
            localCheck(e); // Yapıldı bilgisi local'de üzerine yazılıyor.
        });
        list.appendChild(li);
    }
}

// New list item
const newElement = () => {
    inp.value = inp.value.trim();
    if (!inp.value) {
        inp.classList.add("empty"); //İnput için class eklendi
        inp.setAttribute("placeholder", "Burası Boş Olamaz!"); //İnput için placeholder değiştirildi.
        $(".error").toast("show"); // Sağ üstte toast gösterildi.
    } else {
        var li = document.createElement("LI");
        var button = document.createElement("button");
        button.appendChild(document.createTextNode("Sil"));
        button.setAttribute("onClick", "sil(this)");
        button.setAttribute("class", "btn btn-primary listBtn");
        li.appendChild(document.createTextNode(inp.value));
        li.addEventListener("click", (e) => {
            e.target.classList.toggle("checked");
            localCheck(e);
        });
        localList.push({ value: li.innerHTML, isChecked: false }); // local push
        localStorage.setItem("listItems", JSON.stringify(localList));
        li.appendChild(button);
        list.appendChild(li);
        document.getElementById("task").value = ""; // Eklendikten sonra input alanı boşaltıldı.
        $(".success").toast("show"); // Sağ üstte toast gösterildi.
    }
};
const localCheck = (e) => {
    console.log("girdi");
    console.log(e.target.innerHTML);
    const deger = e.target.innerHTML;
    localList.forEach((element) => {
        if (element.value === deger.slice(0, deger.indexOf("<"))) {
            element.isChecked = !element.isChecked;
        }
    });
    localStorage.setItem("listItems", JSON.stringify(localList));
};
// Boş olunca input'a eklenen still'in kaldırılması
inp.addEventListener("click", (e) => {
    e.target.classList.remove("empty");
    e.target.setAttribute("placeholder", "Bugün ne yapacaksın?");
});

const sil = (el) => {
    // Local'deki dizi içinden silinen eleman çıkarılıp dizi tekrar local'e güncel olarak kaydedildi.
    var deger = el.parentNode.innerHTML;
    deger = deger.slice(0, deger.indexOf("<"));
    console.log(localList[0]);
    localList = localList.filter((item) => item.value != deger);
    console.log(localList);
    localStorage.setItem("listItems", JSON.stringify(localList));

    el.parentNode.remove(); // Ekranda bulunan list item silindi.
};
