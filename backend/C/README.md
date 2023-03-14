## 発行すべきクエリ

```sql
SELECT
  genres.name AS ジャンル名,
  AVG(items.price) AS 平均価格
FROM items
LEFT JOIN genres
  ON items.genre_id = genres.id
GROUP BY genres.id;
```

## 貼るべきインデックス

見つけることができなかった。

JOINの条件である`items.genre_id`にインデックスを貼ることを考えたが、高速化できなかった。

インデックスを貼る前と後について、`EXPLAIN ANALYZE <SQL文>`を使って実行計画を確認した。以下にその結果を残した。

結果的に、インデックスを貼った前後で実行計画に変化はなかった。また実行時間にも明らかな差はなかった。

### 実行計画の条件

* genreテーブルに5件のレコードがある
* itemsテーブルに1,000,000件のレコードがある

### 追加インデックスを貼る前の実行計画

`items.genre_id`にインデックスを貼る前の実行計画:

```terminal
 Finalize GroupAggregate  (cost=14761.15..14827.67 rows=260 width=310) (actual time=186.604..189.707 rows=5 loops=1)
   Group Key: genres.id
   ->  Gather Merge  (cost=14761.15..14821.82 rows=520 width=310) (actual time=186.526..189.695 rows=15 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Sort  (cost=13761.12..13761.77 rows=260 width=310) (actual time=169.121..169.123 rows=5 loops=3)
               Sort Key: genres.id
               Sort Method: quicksort  Memory: 25kB
               Worker 0:  Sort Method: quicksort  Memory: 25kB
               Worker 1:  Sort Method: quicksort  Memory: 25kB
               ->  Partial HashAggregate  (cost=13748.09..13750.69 rows=260 width=310) (actual time=169.047..169.051 rows=5 loops=3)
                     Group Key: genres.id
                     Batches: 1  Memory Usage: 37kB
                     Worker 0:  Batches: 1  Memory Usage: 37kB
                     Worker 1:  Batches: 1  Memory Usage: 37kB
                     ->  Hash Left Join  (cost=15.85..11664.57 rows=416704 width=282) (actual time=0.548..128.820 rows=333333 loops=3)
                           Hash Cond: (items.genre_id = genres.id)
                           ->  Parallel Seq Scan on items  (cost=0.00..10537.04 rows=416704 width=8) (actual time=0.277..50.803 rows=333333 loops=3)
                           ->  Hash  (cost=12.60..12.60 rows=260 width=278) (actual time=0.136..0.137 rows=5 loops=3)
                                 Buckets: 1024  Batches: 1  Memory Usage: 9kB
                                 ->  Seq Scan on genres  (cost=0.00..12.60 rows=260 width=278) (actual time=0.108..0.110 rows=5 loops=3)
 Planning Time: 0.619 ms
 Execution Time: 190.012 ms
(23 rows)
```

### 追加インデックスを貼った後の実行計画

`items.genre_id`にインデックスを貼った後の実行計画:


```terminal
 Finalize GroupAggregate  (cost=14761.15..14827.67 rows=260 width=310) (actual time=180.655..185.678 rows=5 loops=1)
   Group Key: genres.id
   ->  Gather Merge  (cost=14761.15..14821.82 rows=520 width=310) (actual time=180.634..185.653 rows=15 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Sort  (cost=13761.12..13761.77 rows=260 width=310) (actual time=163.659..163.661 rows=5 loops=3)
               Sort Key: genres.id
               Sort Method: quicksort  Memory: 25kB
               Worker 0:  Sort Method: quicksort  Memory: 25kB
               Worker 1:  Sort Method: quicksort  Memory: 25kB
               ->  Partial HashAggregate  (cost=13748.09..13750.69 rows=260 width=310) (actual time=163.566..163.570 rows=5 loops=3)
                     Group Key: genres.id
                     Batches: 1  Memory Usage: 37kB
                     Worker 0:  Batches: 1  Memory Usage: 37kB
                     Worker 1:  Batches: 1  Memory Usage: 37kB
                     ->  Hash Left Join  (cost=15.85..11664.57 rows=416704 width=282) (actual time=0.464..128.655 rows=333343 loops=3)
                           Hash Cond: (items.genre_id = genres.id)
                           ->  Parallel Seq Scan on items  (cost=0.00..10537.04 rows=416704 width=8) (actual time=0.101..41.952 rows=333343 loops=3)
                           ->  Hash  (cost=12.60..12.60 rows=260 width=278) (actual time=0.271..0.271 rows=5 loops=3)
                                 Buckets: 1024  Batches: 1  Memory Usage: 9kB
                                 ->  Seq Scan on genres  (cost=0.00..12.60 rows=260 width=278) (actual time=0.240..0.243 rows=5 loops=3)
 Planning Time: 1.555 ms
 Execution Time: 187.174 ms
(23 rows)
```
