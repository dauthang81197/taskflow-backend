import { MigrationInterface, QueryRunner } from "typeorm";

export class InitBase1762748937216 implements MigrationInterface {
    name = 'InitBase1762748937216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "analytics_cache" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cache_key" character varying(255) NOT NULL, "data_json" jsonb NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_f03a91162f4209750b0256c74ac" UNIQUE ("cache_key"), CONSTRAINT "PK_77fc1b1108543b5574416e9e6c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "refresh_token" character varying(255) NOT NULL, "user_agent" character varying(255) NOT NULL, "ip_address" character varying(100) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" uuid, CONSTRAINT "PK_e93e031a5fed190d4789b6bfd83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "taskId" uuid, "userId" uuid, CONSTRAINT "PK_83b99b0b03db29d4cafcb579b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_labels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "color" character varying(10) NOT NULL, "taskId" uuid, CONSTRAINT "PK_72402f2c22ceabc2e73b718c321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying(255) NOT NULL, "description" text, "status" character varying(20) NOT NULL, "priority" character varying(10) NOT NULL, "due_date" TIMESTAMP WITH TIME ZONE, "projectId" uuid, "assigneeId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(200) NOT NULL, "description" text, "ownerId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email_queue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "to" character varying(255) NOT NULL, "subject" character varying(255) NOT NULL, "template" character varying(100) NOT NULL, "data_json" jsonb, "status" character varying(20) NOT NULL DEFAULT 'pending', CONSTRAINT "PK_b6c031a57087af131ed0176e17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(200) NOT NULL, "message" text NOT NULL, "type" character varying(50) NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "socket_id" character varying(100) NOT NULL, "connected_at" TIMESTAMP WITH TIME ZONE NOT NULL, "disconnected_at" TIMESTAMP WITH TIME ZONE, "userId" uuid, CONSTRAINT "PK_8cfec5d2a549ff20d1f4e648226" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying(255) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "fileId" uuid, CONSTRAINT "PK_6808e16bdb1613f8b6d7d0bbd7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_name" character varying(255) NOT NULL, "mime_type" character varying(100) NOT NULL, "size" integer NOT NULL, "s3_key" character varying(255) NOT NULL, "s3_url" character varying(255) NOT NULL, "ownerId" uuid, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "automation_logs" ("id" SERIAL NOT NULL, "message" text NOT NULL, "level" character varying(10) NOT NULL, "data_json" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "jobId" uuid, "ruleId" uuid, CONSTRAINT "PK_c62c5adfa217facbc2838bd6c99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "automation_jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "event_name" character varying(100) NOT NULL, "payload_json" jsonb NOT NULL, "status" character varying(20) NOT NULL, "attempts" integer NOT NULL, "started_at" TIMESTAMP WITH TIME ZONE, "finished_at" TIMESTAMP WITH TIME ZONE, "error_message" text, "worker_name" character varying(50), "ruleId" uuid, CONSTRAINT "PK_6a617947677dfd7a9897189427d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "automation_rules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(200) NOT NULL, "description" text, "event_name" character varying(100) NOT NULL, "condition_json" jsonb, "action_type" character varying(50) NOT NULL, "action_data_json" jsonb, "enabled" boolean NOT NULL DEFAULT true, "creatorId" uuid, CONSTRAINT "PK_378bed501eacc036895837121c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "automation_actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "order" integer NOT NULL, "type" character varying(50) NOT NULL, "config_json" jsonb, "retry_policy" jsonb, "ruleId" uuid, CONSTRAINT "PK_7d56180c080e74cb362d0db9dee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(190) NOT NULL, "name" character varying(100), "password_hash" character varying(255), "provider" character varying(20) NOT NULL DEFAULT 'local', "provider_id" character varying(100), "avatar_url" character varying(255), "role" character varying(20) NOT NULL DEFAULT 'member', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "oauth_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "provider" character varying(50) NOT NULL, "provider_id" character varying(100) NOT NULL, "access_token" text, "refresh_token" text, "expires_at" TIMESTAMP WITH TIME ZONE, "userId" uuid, CONSTRAINT "PK_710a81523f515b78f894e33bb10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "analytics_snapshots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "period_type" character varying(10) NOT NULL, "period_start" date NOT NULL, "period_end" date NOT NULL, "metrics_json" jsonb NOT NULL, "userId" uuid, "projectId" uuid, CONSTRAINT "PK_72ddc015c269977322f808a19a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" SERIAL NOT NULL, "table_name" character varying(100) NOT NULL, "record_id" uuid NOT NULL, "action" character varying(10) NOT NULL, "diff_json" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "log_entries" ("id" SERIAL NOT NULL, "level" character varying(10) NOT NULL, "message" text NOT NULL, "meta_json" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b226cc4051321f12106771581e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "metric_snapshots" ("id" SERIAL NOT NULL, "service_name" character varying(100) NOT NULL, "cpu_usage" numeric(5,2) NOT NULL, "mem_usage" numeric(5,2) NOT NULL, "request_count" integer NOT NULL, "error_count" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e7df991ed7476a98b561fc45083" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_results" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "module" character varying(50) NOT NULL, "status" character varying(10) NOT NULL, "logs" text, "executed_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_6af5df01fcd3971b362fc828296" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_55fa4db8406ed66bc7044328427" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_comments" ADD CONSTRAINT "FK_ba265816ca1d93f51083e06c520" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_comments" ADD CONSTRAINT "FK_be77588a6727c9a27075b590048" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_b148c8d5eb7df0b134cab11ad2e" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_9a16d2c86252529f622fa53f1e3" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_subscriptions" ADD CONSTRAINT "FK_10d30f9506ec1132570b9280079" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_links" ADD CONSTRAINT "FK_139c305001e735d0a45f35159c4" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_a23484d1055e34d75b25f616792" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "automation_logs" ADD CONSTRAINT "FK_25b23e98be9133e75046049d4e7" FOREIGN KEY ("jobId") REFERENCES "automation_jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "automation_logs" ADD CONSTRAINT "FK_a1a5b920c1214634ac827607d00" FOREIGN KEY ("ruleId") REFERENCES "automation_rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "automation_jobs" ADD CONSTRAINT "FK_036b259e8274e3320e196583804" FOREIGN KEY ("ruleId") REFERENCES "automation_rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "automation_rules" ADD CONSTRAINT "FK_c65c8b819a037feafd990ff54dc" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "automation_actions" ADD CONSTRAINT "FK_c313c2973195fa50d77ebdb6833" FOREIGN KEY ("ruleId") REFERENCES "automation_rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "oauth_accounts" ADD CONSTRAINT "FK_4c22f13249ce02f89dc6d226e9c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "analytics_snapshots" ADD CONSTRAINT "FK_449e30edd459b28b0e755f814c3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "analytics_snapshots" ADD CONSTRAINT "FK_1b491ce5a1267b379c9310783cf" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_cfa83f61e4d27a87fcae1e025ab" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_cfa83f61e4d27a87fcae1e025ab"`);
        await queryRunner.query(`ALTER TABLE "analytics_snapshots" DROP CONSTRAINT "FK_1b491ce5a1267b379c9310783cf"`);
        await queryRunner.query(`ALTER TABLE "analytics_snapshots" DROP CONSTRAINT "FK_449e30edd459b28b0e755f814c3"`);
        await queryRunner.query(`ALTER TABLE "oauth_accounts" DROP CONSTRAINT "FK_4c22f13249ce02f89dc6d226e9c"`);
        await queryRunner.query(`ALTER TABLE "automation_actions" DROP CONSTRAINT "FK_c313c2973195fa50d77ebdb6833"`);
        await queryRunner.query(`ALTER TABLE "automation_rules" DROP CONSTRAINT "FK_c65c8b819a037feafd990ff54dc"`);
        await queryRunner.query(`ALTER TABLE "automation_jobs" DROP CONSTRAINT "FK_036b259e8274e3320e196583804"`);
        await queryRunner.query(`ALTER TABLE "automation_logs" DROP CONSTRAINT "FK_a1a5b920c1214634ac827607d00"`);
        await queryRunner.query(`ALTER TABLE "automation_logs" DROP CONSTRAINT "FK_25b23e98be9133e75046049d4e7"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_a23484d1055e34d75b25f616792"`);
        await queryRunner.query(`ALTER TABLE "file_links" DROP CONSTRAINT "FK_139c305001e735d0a45f35159c4"`);
        await queryRunner.query(`ALTER TABLE "notification_subscriptions" DROP CONSTRAINT "FK_10d30f9506ec1132570b9280079"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_9a16d2c86252529f622fa53f1e3"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956"`);
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_b148c8d5eb7df0b134cab11ad2e"`);
        await queryRunner.query(`ALTER TABLE "task_comments" DROP CONSTRAINT "FK_be77588a6727c9a27075b590048"`);
        await queryRunner.query(`ALTER TABLE "task_comments" DROP CONSTRAINT "FK_ba265816ca1d93f51083e06c520"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_55fa4db8406ed66bc7044328427"`);
        await queryRunner.query(`DROP TABLE "test_results"`);
        await queryRunner.query(`DROP TABLE "metric_snapshots"`);
        await queryRunner.query(`DROP TABLE "log_entries"`);
        await queryRunner.query(`DROP TABLE "audit_logs"`);
        await queryRunner.query(`DROP TABLE "analytics_snapshots"`);
        await queryRunner.query(`DROP TABLE "oauth_accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "automation_actions"`);
        await queryRunner.query(`DROP TABLE "automation_rules"`);
        await queryRunner.query(`DROP TABLE "automation_jobs"`);
        await queryRunner.query(`DROP TABLE "automation_logs"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "file_links"`);
        await queryRunner.query(`DROP TABLE "notification_subscriptions"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "email_queue"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "task_labels"`);
        await queryRunner.query(`DROP TABLE "task_comments"`);
        await queryRunner.query(`DROP TABLE "user_sessions"`);
        await queryRunner.query(`DROP TABLE "analytics_cache"`);
    }

}
