var word, guesses = [], stage = 0

// Renders the word and replaces non-guessed letters with underscores
function render_word(showall=false) {
  $("#guess").html(word.replace(/[A-Za-z]/g, m => (guesses.includes(m) || showall ? m : "_") + "&nbsp"))
}

function start_game() {
  $("#start_dialog").hide() // Hide the start dialog
  $("#game").show() // Show game elements
  $("#stages pre:not(:first-child)").hide() // Hide all stages except the first
  render_word() // and render the word
}

$(".letter").click(function () {
  $(this).prop("disabled", true) // Disable this letter
  guess = $(this).text() // get the actual letter
  guess = [guess.toUpperCase(), guess.toLowerCase()] // Both upper and lowercase
  if (guess.some(l => word.includes(l))) { // If it is in the word
    guesses.push(...guess) // add it to the guesses
    render_word()          // and render it
  } else { // Otherwise show the next stage
    $("#stages pre").hide().eq(++stage).show()
  }

  // Get how many letters are left by counting the underscores
  remaining = ($("#guess").html().match(/_/g) || []).length
  if (remaining == 0) { // Win condition
    alert("You win!!") // some celebration
    $(".letter").prop("disabled", true) // disable all the letters
  }
  
  // If we run out of stages disable all the letters
  if (stage >= $("#stages pre").length - 1) {
    $(".letter").prop("disabled", true)
    render_word(true)
  }
})

$("#start").click(e => {
  if (!$("#word").hasClass("valid")) return; // Check if the word is valid
  word = $("#word").val().trim() // the word is what they entered without leading or trailing whitespace
  start_game()
})

const words = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes","bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar","boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph","cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow","dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking","fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled","frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm","glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic","icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy","jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy","jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit","klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz","microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx","ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka","pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes","quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy","sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied","subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress","transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize","vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy","wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy","wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr","zigzag", "zigzagging", "zilch", "zipper", "zodiac"]

$("#rand_start").click(e => {
  word = words[Math.floor(Math.random() * words.length)]
  start_game()
})