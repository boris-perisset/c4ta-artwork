const palettes = [
    {
      name: "Malibu Silver",
      colors: [
        "#51938b", 
        "#6dd4c2", 
        "#9dd1cc", 
        "#c4c8d3", 
        "#e5bdda", 
        "#e3b9de", 
        "#bebbdf", 
        "#92bcdf", 
        "#5dbce0", 
        "#81bada"
      ],
      lines: [
        "#908ee6", 
        "#79d2b7", 
        "#86b5d0", 
        "#87d899", 
        "#90dd7b" 
    ],
    link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiMzI2NGRmMjAzNjk3ZiIsImEiOjEwLCJjZyI6NywiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzM2NDkwODE5MjUwOTAyNywibWQiOjYwLCJjbSI6ImxhYiIsImYiOiJMZWdhY3kiLCJjIjoiaHNsdXYiLCJzYyI6ZmFsc2UsImJ3Ijp0cnVlLCJhaCI6ZmFsc2UsIml1IjoiIiwibG0iOnRydWUsInNtIjpmYWxzZSwibjEiOjAuODc0NTMyNjU5NjMzMTEzNCwibjIiOjAuMzE3NTk0NjgwNjUyMjc0Nn0="
    },
    {
      name: "Grape Crisis",
      colors: [
        "#a38361", 
        "#eebd8a", 
        "#f5c5a2", 
        "#f8cbb9", 
        "#f9d0cf", 
        "#fad3e0", 
        "#fad3e9", 
        "#f9d4f2", 
        "#f8d4fa", 
        "#e6d1ec"
      ],
      lines: [
        "#cb3cb9", 
        "#b08eec", 
        "#d957d9", 
        "#bb7beb", 
  
      ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiYzE0MDBhNjI1NzkwNyIsImEiOjEwLCJjZyI6NywiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzM0NTM1MjM0Mzk1NzM5LCJtZCI6NjAsImNtIjoibGFiIiwiZiI6IkxlZ2FjeSIsImMiOiJoc2x1diIsInNjIjpmYWxzZSwiYnciOnRydWUsImFoIjpmYWxzZSwiaXUiOiIiLCJsbSI6dHJ1ZSwic20iOmZhbHNlLCJuMSI6MC44MTc5MTk2MjY2MjkzNzQzLCJuMiI6MC45NTczMjA1MDc3MzEzODQxfQ=="
    },
    {
      name: "Totoro's Stone",
      colors: [
        "#6c8042", 
        "#97b65a", 
        "#8ab76a", 
        "#77b579", 
        "#5eb387", 
        "#6dbb9a", 
        "#a1cdb1", 
        "#d1deca", 
        "#fcede0", 
        "#e4ddcb"
      ],
      lines: [
        "#72a088", 
        "#fee58b",
        "#8db672", 
        "#ead25b", 
      ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiOGUwOTViNDVhMjA1ZSIsImEiOjEwLCJjZyI6NywiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzMzODgyODYwMzA3NTI1NCwibWQiOjYwLCJjbSI6ImxhYiIsImYiOiJMZWdhY3kiLCJjIjoiaHNsdXYiLCJzYyI6ZmFsc2UsImJ3Ijp0cnVlLCJhaCI6ZmFsc2UsIml1IjoiIiwibG0iOnRydWUsInNtIjpmYWxzZSwibjEiOjAuNjYyMDQ2ODM1Mjk4NDczMywibjIiOjAuOTg1MDY1MzQ5MDgzNzAzMX0="
    },
    {
      name: "Near the Shore",
      colors: [
        "#2e767e", 
        "#32aab7", 
        "#41bcc9", 
        "#4fcbda", 
        "#5ddbeb", 
        "#69e3eb", 
        "#71e4db", 
        "#78e4cb", 
        "#7ee5bc", 
        "#9edfc2"
      ],
      lines: [
        "#b17ac1", 
        "#e09cf5", 
        "#d379d1", 
        "#e787ea", 
   
      ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiYjBiYTBlYjA4ZmQzOCIsImEiOjEwLCJjZyI6NywiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzMyNTc4MTEyMTMxMDk4MiwibWQiOjYwLCJjbSI6ImxhYiIsImYiOiJMZWdhY3kiLCJjIjoiaHNsdXYiLCJzYyI6ZmFsc2UsImJ3Ijp0cnVlLCJhaCI6ZmFsc2UsIml1IjoiIiwibG0iOnRydWUsInNtIjpmYWxzZSwibjEiOjAuNDE5MzQxODcyODQzNDkyMDYsIm4yIjowLjM5NTQwMTc2NDY1MzAzNDY3fQ=="
    },
    {
      name: "Pomelo Lucerne",
      colors: [
        "#a5565c", 
        "#f27985", 
        "#e98ba5", 
        "#d79ac5", 
        "#bea9e5", 
        "#a2ace9", 
        "#8aa3cf", 
        "#729ab6", 
        "#5d929f", 
        "#8aa6a8"
      ],
      lines: [
        "#d6668c", 
        "#e08643", 
        "#d79830", 
        "#de697c", 
  ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiNTJlMDYwMzNjNDgzMyIsImEiOjEwLCJjZyI6NywiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzM1MTg2NTgzNTQ0MzAxNCwibWQiOjYwLCJjbSI6ImxhYiIsImYiOiJMZWdhY3kiLCJjIjoiaHNsdXYiLCJzYyI6ZmFsc2UsImJ3Ijp0cnVlLCJhaCI6ZmFsc2UsIml1IjoiIiwibG0iOnRydWUsInNtIjpmYWxzZSwibjEiOjAuMTg5OTY3ODIxNjA1NTE5MjgsIm4yIjowLjc3NzUwODA4MjE2NDQzMjZ9"
    },
    {
      name: "Cornflake Key",
      colors: [
        "#989163", 
        "#dbcf8a", 
        "#e3d78c", 
        "#e8db8c", 
        "#eddf8c", 
        "#dcd491", 
        "#b4b999", 
        "#8aa0a0", 
        "#5c8aa5", 
        "#7695a7"
      ],
      lines: [
        "#d6668c", 
        "#e08643", 
        "#d79830", 
        "#de697c", 
  ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiYzYxMjQ1ZWE0ODYzZSIsImEiOjEwLCJjZyI6NywiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzMyNTc3NTk5NjYxMjcyNCwibWQiOjYwLCJjbSI6ImxhYiIsImYiOiJMZWdhY3kiLCJjIjoiaHNsdXYiLCJzYyI6ZmFsc2UsImJ3Ijp0cnVlLCJhaCI6ZmFsc2UsIml1IjoiIiwibG0iOnRydWUsInNtIjpmYWxzZSwibjEiOjAuNDQ4Njc4NTcxMjM2MjUyMiwibjIiOjAuMTgyOTcyMzU4Nzc4MTIwMzJ9"
    },
    {
      name: "Coral Atlantis",
      colors: [
        "#385d74", 
        "#4983a7", 
        "#59acdc", 
        "#85a7d5", 
        "#a695bf", 
        "#be82aa", 
        "#d06d95", 
        "#dc5f88", 
        "#dd7a97", 
        "#db92a6"
      ],
      lines: [
        "#be82aa", 
        "#d06d95", 
        "#dc5f88", 
        "#dd7a97", 
        "#db92a6" 
  ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiNmM4MjcxZjNlZDg2ZSIsImEiOjEwLCJjZyI6NCwiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzQ4NzIwNDI1MzcyMjY5LCJtZCI6NjAsImNtIjoibGFiIiwiZiI6IkxlZ2FjeSIsImMiOiJoc2x1diIsInNjIjpmYWxzZSwiYnciOnRydWUsImFoIjpmYWxzZSwiaXUiOiIiLCJsbSI6dHJ1ZSwic20iOmZhbHNlLCJuMSI6MC42NDU5NDM0MDE3Njg2MjAzLCJuMiI6MC4wMzUxMjM4NTEzNDcxNjQ4NjR9"
    },
    {
      name: "Pistachio Luck",
      colors: [
        "#2f233f", 
        "#554c53", 
        "#878d66", 
        "#bbd376", 
        "#a7d98a", 
        "#83d69e", 
        "#5dd2ab", 
        "#7fc88c", 
        "#94be6c", 
        "#a3b667"
      ],
      lines: [
        "#878d66", 
        "#bbd376", 
        "#a7d98a", 
        "#83d69e", 
  ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiODc4OTdiYTQzYTY2ZSIsImEiOjEwLCJjZyI6NCwiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzQ2Nzk5MzAyMzE3MzQzNCwibWQiOjYwLCJjbSI6ImxhYiIsImYiOiJMZWdhY3kiLCJjIjoiaHNsdXYiLCJzYyI6ZmFsc2UsImJ3Ijp0cnVlLCJhaCI6ZmFsc2UsIml1IjoiIiwibG0iOnRydWUsInNtIjpmYWxzZSwibjEiOjAuOTI4MzQxNzA1MDg0OTQyNSwibjIiOjAuOTIwNjQ1MzQwNjMxNzQzNn0="
    },
    {
      name: "Coral Atlantis",
      colors: [
        "#1f2821", 
        "#405650", 
        "#729f9d", 
        "#a8eef1", 
        "#c4f5fb", 
        "#d9f1fb", 
        "#eaebf8", 
        "#edd6db", 
        "#edc1c0", 
        "#e2b5ac"
      ],
      lines: [
        "#729f9d", 
        "#a8eef1", 
        "#c4f5fb", 
        "#d9f1fb", 
  ],
      link: "https://farbvelo.elastiq.ch/?s=eyJzIjoiOGUxZGE5ZjJhNTI3OCIsImEiOjEwLCJjZyI6NCwiaGciOnRydWUsImhiIjp0cnVlLCJobyI6ZmFsc2UsImhjIjpmYWxzZSwiaHQiOmZhbHNlLCJiIjpmYWxzZSwicCI6MC4xNzQ2MTU4NzYwMjQwNjIyNiwibWQiOjYwLCJjbSI6ImxhYiIsImYiOiJMZWdhY3kiLCJjIjoiaHNsdXYiLCJzYyI6ZmFsc2UsImJ3Ijp0cnVlLCJhaCI6ZmFsc2UsIml1IjoiIiwibG0iOnRydWUsInNtIjpmYWxzZSwibjEiOjAuOTY4OTcxMjQ2Nzg1NTkzOCwibjIiOjAuOTgyNzI4Mzc3MDkxNDMzMn0="
    },
  ]