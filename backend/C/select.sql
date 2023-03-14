-- SELECT文
SELECT
  genres.name AS ジャンル名,
  AVG(items.price) AS 平均価格
FROM items
LEFT JOIN genres
  ON items.genre_id = genres.id
GROUP BY genres.id;

-- 実行計画
EXPLAIN ANALYZE SELECT
  genres.name AS ジャンル名,
  AVG(items.price) AS 平均価格
FROM items
LEFT JOIN genres
  ON items.genre_id = genres.id
GROUP BY genres.id;
