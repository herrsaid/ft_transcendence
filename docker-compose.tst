version: '3.1'

services:
  db:
    image: postgres
    restart: always
    # volumes:
    #   - ./data/db:/var/lib/postgresql/data
    ports:
      - 5432:5432
    # environment:
    #   - POSTGRES_DB=pong
    #   - POSTGRES_USER=postgres
    #   - POSTGRES_PASSWORD=postgres
    env_file:
      - ./backend/.postgres.env
    networks:
      - my_net
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    networks:
      - my_net
  
networks:
    my_net: