function doSearch() {
    const search = document.getElementById("searchBtn").value;
    if (search.length === 0) {
    location.href = "/produkte/gewuerze/suche/";
    return false;
  } else {
    location.href = "/produkte/gewuerze/suche/" + search;
    return false;
  }
}