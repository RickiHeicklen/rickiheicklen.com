async function getCommits(pageName) {
    var result = await fetch('https://api.github.com/repos/rickiheicklen/rickiheicklen.github.io/commits?path='+ encodeURIComponent(pageName));
    var data = await result.json();

    var timestamp = new Date(data[0].commit.author.date)
    // the Date function takes a date string, and returns a date object.
    var formattedDate = timestamp.toDateString()

    console.log(formattedDate)
    document.getElementById('last-updated').innerHTML = "<p><br><i>This page was last updated on "+ formattedDate + ".</i></p>";
    return;
}