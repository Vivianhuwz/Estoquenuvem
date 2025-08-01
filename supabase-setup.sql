-- Supabase数据库初始化脚本
-- 在Supabase SQL编辑器中执行此脚本

-- 1. 创建库存数据表
CREATE TABLE IF NOT EXISTS inventory_data (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '[]'::jsonb,
  images JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 2. 添加表注释
COMMENT ON TABLE inventory_data IS '库存管理系统数据表';
COMMENT ON COLUMN inventory_data.id IS '主键，固定为1（单行表）';
COMMENT ON COLUMN inventory_data.data IS '库存数据JSON';
COMMENT ON COLUMN inventory_data.images IS '产品图片数据JSON';
COMMENT ON COLUMN inventory_data.updated_at IS '最后更新时间';
COMMENT ON COLUMN inventory_data.created_at IS '创建时间';

-- 3. 启用行级安全策略
ALTER TABLE inventory_data ENABLE ROW LEVEL SECURITY;

-- 4. 删除现有策略（如果存在）
DROP POLICY IF EXISTS "Allow all operations" ON inventory_data;
DROP POLICY IF EXISTS "Enable read access for all users" ON inventory_data;
DROP POLICY IF EXISTS "Enable insert access for all users" ON inventory_data;
DROP POLICY IF EXISTS "Enable update access for all users" ON inventory_data;
DROP POLICY IF EXISTS "Enable delete access for all users" ON inventory_data;

-- 5. 创建安全策略
-- 注意：这是开发环境的宽松策略，生产环境请根据需要调整

-- 允许所有用户读取数据
CREATE POLICY "Enable read access for all users" ON inventory_data
  FOR SELECT USING (true);

-- 允许所有用户插入数据
CREATE POLICY "Enable insert access for all users" ON inventory_data
  FOR INSERT WITH CHECK (true);

-- 允许所有用户更新数据
CREATE POLICY "Enable update access for all users" ON inventory_data
  FOR UPDATE USING (true) WITH CHECK (true);

-- 允许所有用户删除数据
CREATE POLICY "Enable delete access for all users" ON inventory_data
  FOR DELETE USING (true);

-- 6. 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. 创建触发器
DROP TRIGGER IF EXISTS update_inventory_data_updated_at ON inventory_data;
CREATE TRIGGER update_inventory_data_updated_at
    BEFORE UPDATE ON inventory_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. 插入初始数据（可选）
INSERT INTO inventory_data (id, data, images) 
VALUES (1, '[]'::jsonb, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 9. 创建索引以提高性能
CREATE INDEX IF NOT EXISTS idx_inventory_data_updated_at ON inventory_data(updated_at);

-- 10. 验证设置
SELECT 
  'inventory_data表创建成功' as status,
  COUNT(*) as row_count,
  MAX(updated_at) as last_updated
FROM inventory_data;

-- 验证表创建成功
SELECT 
  'inventory_data表创建成功！' as message,
  COUNT(*) as record_count
FROM inventory_data;

-- 显示安全策略（可选）
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'inventory_data';

SELECT 'Supabase数据库初始化完成！' as message;