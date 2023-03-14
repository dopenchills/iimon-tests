import psycopg2
import random

# データベースに接続する
conn = psycopg2.connect(host="localhost", database="backend_c_improved", user="postgres", password="postgres")
cur = conn.cursor()

# 100000個のレコードを生成し、itemsテーブルに追加する
for i in range(1000000):
    name = f"item{i}"
    price = random.randint(100, 1000)
    genre_id = random.randint(1, 5)
    cur.execute("INSERT INTO items (name, price, genre_id) VALUES (%s, %s, %s)", (name, price, genre_id))
    conn.commit()

# データベースから切断する
cur.close()
conn.close()
