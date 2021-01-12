package main

import (
	"creedence/pkg/websocket"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)
func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		_, _ = fmt.Fprintf(w, "%+V\n", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env")
	}

	fmt.Println("Distributed Chat App v0.01")
	setupRoutes()

	log.Printf("Server starting at localhost:%s", os.Getenv("PORT"))
	_ = http.ListenAndServe(":" + os.Getenv("PORT"), nil)
}
