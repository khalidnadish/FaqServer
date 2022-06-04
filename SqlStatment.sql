-- Show all Faq 
SELECT
     faq.faqid,
     faq.create_at,
     faq.faq,
     user.username AS autherName
FROM
     `faq`
     INNER JOIN user ON faq.userid = user.userid
ORDER BY
     faq.faqid;