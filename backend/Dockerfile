
FROM ruby:3.1

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN gem install bundler:2.4.20 && bundle install

COPY . .

RUN rm -f /app/tmp/pids/server.pid

EXPOSE 3000

CMD ["bin/rails", "db:migrate", "&&", "bin/rails", "server", "-b", "0.0.0.0"]

