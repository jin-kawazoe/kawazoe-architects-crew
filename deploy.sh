#!/bin/bash
# KAWAZOE CREW - Plesk デプロイスクリプト
# 使用前に以下を設定してください:
#   PLESK_HOST: サーバーのホスト名またはIPアドレス
#   PLESK_USER: SSHユーザー名
#   REMOTE_PATH: サーバー上のデプロイパス

set -e

PLESK_HOST="${PLESK_HOST:-your-server.example.com}"
PLESK_USER="${PLESK_USER:-username}"
REMOTE_PATH="${REMOTE_PATH:-/var/www/vhosts/kawazoe-architects.com/httpdocs/crew}"

echo "==> ビルド中..."
npm run build

echo "==> .next/standalone をデプロイ中..."
rsync -avz --delete \
  .next/standalone/ \
  "${PLESK_USER}@${PLESK_HOST}:${REMOTE_PATH}/"

echo "==> .next/static をデプロイ中..."
rsync -avz --delete \
  .next/static/ \
  "${PLESK_USER}@${PLESK_HOST}:${REMOTE_PATH}/.next/static/"

echo "==> public をデプロイ中..."
rsync -avz --delete \
  public/ \
  "${PLESK_USER}@${PLESK_HOST}:${REMOTE_PATH}/public/"

echo "==> サーバー再起動..."
ssh "${PLESK_USER}@${PLESK_HOST}" "
  cd ${REMOTE_PATH} &&
  pm2 restart crew || pm2 start server.js --name crew --env production
"

echo "==> デプロイ完了"
