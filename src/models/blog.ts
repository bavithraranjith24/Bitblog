/**
 * @copyright 2025 Bavithra
 * @license Apache-2.0
 */

/**
 * Node modules
 */

import { Schema, model, Types } from 'mongoose';

/**
 * Custom modules
 */

import { genSlug } from '@/utils';

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  banner: {
    publicId: string;
    url: string;
    width: number;
    height: number;
  };
  author: Types.ObjectId;
  viwesCount: number;
  likeCount: number;
  commentsCount: number;
  status: 'draft' | 'published';
}

/**
 * Blog schema
 */

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxLength: [180, 'Title must be less than 180 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: [true, 'Slug must be unique'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    banner: {
      publicId: {
        type: String,
        required: [true, 'Banner public ID is required'],
      },
      url: {
        type: String,
        required: [true, 'Banner URL is required'],
      },
      width: {
        type: Number,
        required: [true, 'Banner width is required'],
      },
      height: {
        type: Number,
        required: [true, 'Banner height is required'],
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    viwesCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'published'],
        message: '{VALUE} is not supported',
      },
      default: 'draft',
    },
  },
  {
    timestamps: {
      createdAt: 'publishedAt',
    },
  },
);

blogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = genSlug(this.title);
  }
});

export default model<IBlog>('Blog', blogSchema);
