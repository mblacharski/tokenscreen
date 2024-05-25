\connect tokens_db tokens_root;

-- Create `tokens` table

-- Lengths can be modified if needed


-- `token_` prefix in order not to expose DB colum names in API

CREATE TABLE tokens (
    token_id SERIAL PRIMARY KEY,
    -- NOT NULL - the token needs to be displayed!
    token_name VARCHAR(40) NOT NULL,
    -- NOT NULL - without `ticker` the value cannot be mapped
    -- I guess this would be the token_id, because we shouldn't have many to one mapping in this case
    --      and that would minimize the database size
    token_ticker VARCHAR(40) NOT NULL UNIQUE,
    token_description VARCHAR(250) DEFAULT '' NOT NULL
);
