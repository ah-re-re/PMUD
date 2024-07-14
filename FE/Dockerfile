# Stage 1: Xây dựng ứng dụng
FROM node:14-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Stage 2: Đóng gói ứng dụng
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sao chép tệp build của ứng dụng React vào container
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
